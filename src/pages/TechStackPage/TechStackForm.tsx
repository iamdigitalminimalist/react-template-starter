import axios from 'axios';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { useToast } from '@/hooks/use-toast';
import { techStackSchema, type TechStackSchema } from '@/schemas';
import useCategories from './hooks/useCategories';
import type { TechStack } from './types';

interface TechStackFormProps {
  onCloseDialog: () => void;
}

export function TechStackForm({
  onCloseDialog,
}: TechStackFormProps): JSX.Element {
  const { toast } = useToast();

  const form = useForm<TechStackSchema>({
    resolver: zodResolver(techStackSchema),
    defaultValues: {
      name: '',
      category: '',
      description: '',
    },
  });

  const { data: categories, isLoading, error } = useCategories();

  async function onSubmit(values: TechStackSchema): Promise<void> {
    const selectedCategory = categories?.find(
      (category) => category.name === values.category,
    );

    if (!categories || !selectedCategory) {
      console.error('Categories are undefined. Unable to submit the form.');

      return;
    }

    const newTechStack: TechStack = {
      id: Math.floor(Date.now() + Math.random() * 10000),
      name: values.name,
      description: values.description,
      categories: [selectedCategory],
    };

    try {
      await axios.post<TechStack>('/techstack', newTechStack);
      toast({
        title: 'Tech Stack Added',
        description: `The tech stack "${values.name}" was added successfully.`,
      });
      onCloseDialog();
    } catch (err) {
      console.error('Error adding tech stack:', err);
      toast({
        title: 'Error',
        description: 'Something went wrong, please try again later.',
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(event) => {
          void form.handleSubmit(onSubmit)(event);
        }}
        className="space-y-4"
      >
        {' '}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">Technology Name</FormLabel>
              <FormControl>
                <Input
                  id="name"
                  placeholder="e.g., React, Kubernetes"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="category">Category</FormLabel>
              <FormControl>
                {isLoading ? (
                  <p>Loading categories...</p>
                ) : error ? (
                  <p>Error loading categories</p>
                ) : (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="description">Description</FormLabel>
              <FormControl>
                <Textarea
                  id="description"
                  placeholder="Describe the technology"
                  {...field}
                />
              </FormControl>
              <FormDescription>Max 250 characters.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!form.formState.isValid}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
