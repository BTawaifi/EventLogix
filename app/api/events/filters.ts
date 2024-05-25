import { Prisma } from '@prisma/client';

export const parsePagination = (page: string, limit: string) => {
  const pageNumber = Number(page) || 1;
  const limitNumber = Number(limit) || 10;
  const skip = (pageNumber - 1) * limitNumber;
  return { skip, take: limitNumber };
};

export const parseDateFilters = (startDate: string | null, endDate: string | null) => {
  const filters: Prisma.EventWhereInput = {};
  if (startDate || endDate) {
    filters.occurred_at = {};
    if (startDate) filters.occurred_at.gte = new Date(startDate);
    if (endDate) filters.occurred_at.lte = new Date(endDate);
  }
  return filters;
};

export const parseSearchFilter = (search: string | null) => {
  if (search) {
    return {
      OR: [
        { actor: { name: { contains: search, mode: 'insensitive' } } },
        { target: { name: { contains: search, mode: 'insensitive' } } },
        { action: { name: { contains: search, mode: 'insensitive' } } },
      ],
    };
  }
  return {};
};

export const parseOtherFilters = (
  actorId: string | null,
  targetId: string | null,
  actionId: string | null
) => {
  const filters: Prisma.EventWhereInput = {};
  if (actorId) filters.actorId = actorId;
  if (targetId) filters.targetId = targetId;
  if (actionId) filters.actionId = actionId;
  return filters;
};
