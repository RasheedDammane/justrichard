import { Prisma } from '@prisma/client';

export type ServiceWithTranslations = Prisma.ServiceGetPayload<{
  include: {
    category: {
      include: {
        translations: true;
      };
    };
    translations: true;
    prices: true;
    addons: {
      include: {
        translations: true;
      };
    };
  };
}>;

export type BookingWithDetails = Prisma.BookingGetPayload<{
  include: {
    service: {
      include: {
        translations: true;
      };
    };
    address: true;
    addons: {
      include: {
        addon: {
          include: {
            translations: true;
          };
        };
      };
    };
    payment: true;
  };
}>;

export type UserWithProfile = Prisma.UserGetPayload<{
  include: {
    profile: true;
    addresses: true;
  };
}>;
