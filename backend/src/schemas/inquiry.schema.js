import { z } from "zod";

const createInquirySchema = z.object({
  property: z.string(),
  name: z.string().min(1),
  phone: z.string().min(5),
  email: z.string().email().optional(),
  message: z.string().optional()
});

const updateInquirySchema = z
  .object({
    status: z.enum(["new", "contacted", "closed"]).optional(),
    adminNotes: z.string().optional()
  })
  .strict();

export { createInquirySchema, updateInquirySchema };