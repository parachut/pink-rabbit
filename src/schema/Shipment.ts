import { objectType } from '@nexus/schema';

export const Shipment = objectType({
  name: 'Shipment',
  definition(t) {
    t.model.id();
    t.model.trackingCode();
  },
});
