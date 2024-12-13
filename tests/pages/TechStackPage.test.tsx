import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import { simulateDelay, simulateError } from '../lib/utils';
import { AllProvider } from '../providers';
import TechStackPage from '@/pages/TechStackPage';
import { db } from '../mocks/db';
import userEvent from '@testing-library/user-event';
import { Category, TechStack } from '@/pages/TechStackPage/types';

describe('TechStackPage', () => {
  const categories: Category[] = [];
  const techStack: TechStack[] = [];

  beforeAll(() => {
    [1, 2].forEach((item) => {
      const category = db.category.create({ name: `Category ${item}` });
      categories.push(category);
    });

    categories.forEach((category, index) => {
      [1, 2].forEach((subItem) => {
        const tech = db.tech.create({
          name: `Tech ${index * 2 + subItem}`,
          description: `Description for Tech ${index * 2 + subItem}`,
          categories: [category],
        });
        techStack.push(tech);
      });
    });
  });

  afterAll(() => {
    const categoryIds = categories.map((c) => c.id);
    db.category.deleteMany({
      where: { id: { in: categoryIds } },
    });

    const techStackIds = techStack.map((t) => t.id);
    db.tech.deleteMany({
      where: { id: { in: techStackIds } },
    });
  });

  describe('Loading State', () => {
    it('should show a loading skeleton when fetching tech stack', () => {
      simulateDelay('/techstack');
      const { getTechStackSkeleton } = renderComponent();
      expect(getTechStackSkeleton()).toBeVisible();
    });

    it('should hide the loading skeleton when tech stack is loaded', async () => {
      const { getTechStackSkeleton } = renderComponent();
      await waitForElementToBeRemoved(getTechStackSkeleton);
    });

    it('should show a loading skeleton when fetching filter categories', () => {
      simulateDelay('/categories');
      const { getCategoriesSkeleton } = renderComponent();
      expect(getCategoriesSkeleton()).toBeVisible();
    });

    it('should hide the loading skeleton when filter categories are loaded', async () => {
      const { getCategoriesSkeleton } = renderComponent();
      await waitForElementToBeRemoved(getCategoriesSkeleton);
    });
  });

  describe('Error State', () => {
    it('should not render an error if categories cannot be fetched', async () => {
      simulateError('/categories');
      const { getCategoriesSkeleton, getErrorMessage } = renderComponent();
      await waitForElementToBeRemoved(getCategoriesSkeleton);
      expect(getErrorMessage()).not.toBeInTheDocument();
    });

    it('should render an error if techstack cannot be fetched', async () => {
      simulateError('techstack');
      const { findErrorMessage } = renderComponent();
      const errorMessage = await findErrorMessage();
      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe('Fetching Data', () => {
    it('should render category filter buttons once categories are fetched', async () => {
      const { getCategoriesSkeleton, getCategoryButtons } = renderComponent();
      await waitForElementToBeRemoved(getCategoriesSkeleton);

      const categoryButtons = getCategoryButtons();
      expect(categoryButtons.length).toBeGreaterThan(0);

      for (const category of categories) {
        const button = screen.getByRole('button', { name: category.name });
        expect(button).toBeInTheDocument();
        expect(button).toBeEnabled();
      }
    });

    it('should render tech stack items once tech stack is fetched', async () => {
      const { getTechStackSkeleton, getTechStackItems } = renderComponent();
      await waitForElementToBeRemoved(getTechStackSkeleton);

      const techStackItems = getTechStackItems();
      expect(techStackItems.length).toBe(4);

      for (const tech of techStack) {
        const techName = screen.getByRole('heading', {
          level: 2,
          name: tech.name,
        });
        const techDescription = screen.getByText(tech.description);
        expect(techName).toBeInTheDocument();
        expect(techDescription).toBeInTheDocument();
      }
    });
  });

  describe('Filtering Data', () => {
    it('should filter tech stack by category', async () => {
      const { getTechStackItems, selectCategory } = renderComponent();

      const selectedCategory = categories[0];
      await selectCategory(selectedCategory.name);

      const filteredTechItems = techStack.filter((tech) =>
        tech.categories.some((cat) => cat.id === selectedCategory.id),
      );
      const otherTechItems = techStack.filter(
        (tech) =>
          !tech.categories.some((cat) => cat.id === selectedCategory.id),
      );

      const displayedTechItems = getTechStackItems();
      expect(displayedTechItems.length).toBe(filteredTechItems.length);

      filteredTechItems.forEach((tech) => {
        const techItem = screen.getByText(tech.name);
        expect(techItem).toBeInTheDocument();
      });

      otherTechItems.forEach((tech) => {
        const techItem = screen.queryByText(tech.name);
        expect(techItem).not.toBeInTheDocument();
      });
    });
  });

  it('should render all tech stack items when no category is selected', async () => {
    const { getTechStackItems, deselectCategory } = renderComponent();

    const selectedCategory = categories[0];
    await deselectCategory(selectedCategory.name);
    const displayedTechItems = getTechStackItems();
    expect(displayedTechItems.length).toBe(4);
  });

  describe('Add Tech Stack', async () => {
    it('should open the dialog form when the user click on the add button', async () => {
      const { openForm } = renderComponent();
      await openForm();
      const dialog = await screen.findByRole('dialog');
      expect(dialog).toBeInTheDocument();
    });
  });
});

const renderComponent = () => {
  render(<TechStackPage />, { wrapper: AllProvider });

  const user = userEvent.setup();

  // Selectors
  const getCategoriesSkeleton = () =>
    screen.queryByRole('progressbar', { name: /loading categories/i });
  const getTechStackSkeleton = () =>
    screen.queryByRole('progressbar', { name: /loading tech stack/i });
  const getCategoryButtons = () => screen.getAllByRole('button');
  const getTechStackItems = () => screen.getAllByRole('heading', { level: 2 });
  const getErrorMessage = () => screen.queryByText(/error/i);
  const findErrorMessage = async () => await screen.findByText(/error/i);

  // Actions
  const selectCategory = async (categoryName: string) => {
    await waitForElementToBeRemoved(getCategoriesSkeleton);
    const button = screen.getByRole('button', { name: categoryName });
    await user.click(button);
  };

  const deselectCategory = async (categoryName: string) => {
    await waitForElementToBeRemoved(getCategoriesSkeleton);
    const button = screen.getByRole('button', { name: categoryName });
    await user.dblClick(button);
  };

  const openForm = async () => {
    await waitForElementToBeRemoved(getCategoriesSkeleton);
    const button = await screen.findByText(/Suggest Technology/i);
    await user.click(button);
  };

  return {
    getCategoriesSkeleton,
    getTechStackSkeleton,
    getCategoryButtons,
    getTechStackItems,
    getErrorMessage,
    findErrorMessage,
    selectCategory,
    deselectCategory,
    openForm,
  };
};
