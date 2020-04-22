import { objectType, inputObjectType } from '@nexus/schema';

export const Address = objectType({
  name: 'Address',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.company();
    t.model.email();
    t.model.phone();
    t.model.street1();
    t.model.street2();
    t.model.city();
    t.model.state();
    t.model.zip();
    t.model.country();
    t.model.residential();
  },
});

export const AddressCreateInput = inputObjectType({
  name: 'AddressCreateInput',
  definition(t) {
    t.string('name', { required: true });
    t.string('company');
    t.string('email', { required: true });
    t.string('phone');
    t.string('street1', { required: true });
    t.string('street2');
    t.string('city', { required: true });
    t.string('state', { required: true });
    t.string('zip', { required: true });
    t.string('country', { required: true });
    t.boolean('residential');
  },
});
