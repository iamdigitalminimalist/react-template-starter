import { http, HttpResponse } from 'msw';
import { db } from './db';

export const handlers = [
  ...db.product.toHandlers('rest'),
  ...db.category.toHandlers('rest'),
  http.get('/techstack', () => {
    const techStack = db.tech.getAll();
    return HttpResponse.json(techStack);
  }),
];
