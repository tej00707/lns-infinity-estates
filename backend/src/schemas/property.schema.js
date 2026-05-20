import { z } from 'zod';

// Create Zod schemas for Property validation
export const createPropertySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  price: z.number().optional(),
  showPrice: z.boolean().optional(),
  location: z.string().min(1, 'Location is required'),
  propertyType: z.enum(['plot', 'apartment', 'villa', 'house', 'farm'], {
    errorMap: () => ({ message: 'Property type must be one of: plot, apartment, villa, house, farm' })
  }),
  status: z.enum(['available', 'sold', 'pending'], {
    errorMap: () => ({ message: 'Status must be one of: available, sold, pending' })
  }).optional(),
  isVerified: z.boolean().optional(),
  images: z.array(z.string().url('Each image must be a valid URL')).optional()
});

// Update schema where all fields are optional
export const updatePropertySchema = z.object({
  title: z.string().min(1, 'Title must not be empty').optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  showPrice: z.boolean().optional(),
  location: z.string().min(1, 'Location must not be empty').optional(),
  propertyType: z.enum(['plot', 'apartment', 'villa', 'house', 'farm'], {
    errorMap: () => ({ message: 'Property type must be one of: plot, apartment, villa, house, farm' })
  }).optional(),
  status: z.enum(['available', 'sold', 'pending'], {
    errorMap: () => ({ message: 'Status must be one of: available, sold, pending' })
  }).optional(),
  isVerified: z.boolean().optional(),
  images: z.array(z.string().url('Each image must be a valid URL')).optional()
}).strict();
