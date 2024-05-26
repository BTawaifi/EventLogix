export const parsePagination = (page: string, limit: string) => {
  const pageNumber = Number(page) || 1;
  const limitNumber = Number(limit) || 10;
  const skip = (pageNumber - 1) * limitNumber;
  return { skip, take: limitNumber };
};

export const parseDateFilters = (
  startDate: string | null,
  endDate: string | null
) => {
  const filters: { occurred_at?: { gte?: Date; lte?: Date } } = {};
  if (startDate || endDate) {
    filters.occurred_at = {};
    if (startDate) filters.occurred_at.gte = new Date(startDate);
    if (endDate) filters.occurred_at.lte = new Date(endDate);
  }
  return filters;
};

export const parseSearchFilter = (search: string | null): object | null => {
  if (search) {
    return {
      OR: [
        { actor: { is: { name: { contains: search, mode: 'insensitive' } } } },
        { target: { is: { name: { contains: search, mode: 'insensitive' } } } },
        { action: { is: { name: { contains: search, mode: 'insensitive' } } } },
      ],
    };
  }
  return null;
};

export const parseOtherFilters = (
  actorId: string | null,
  targetId: string | null,
  actionId: string | null
) => {
  const filters: { actorId?: string; targetId?: string; actionId?: string } = {};
  if (actorId) filters.actorId = actorId;
  if (targetId) filters.targetId = targetId;
  if (actionId) filters.actionId = actionId;
  return filters;
};