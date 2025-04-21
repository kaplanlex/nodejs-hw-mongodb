import {
  createContactController,
  deleteContactController,
  getContactByIdController,
  getContactsController,
  patchContactController,
  upsertContactController,
} from '../controllers/contacts.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contact.js';

import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { checkUser } from '../middlewares/checkUser.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validBody } from '../middlewares/validBody.js';

const router = Router();

router.use(authenticate);

router.get('/', checkUser(), ctrlWrapper(getContactsController));

router.get(
  '/:contactId',
  checkUser(),
  isValidId,
  ctrlWrapper(getContactByIdController),
);

router.post(
  '/',
  checkUser(),
  validBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.delete(
  '/:contactId',
  checkUser(),
  isValidId,
  ctrlWrapper(deleteContactController),
);

router.put(
  '/:contactId',
  checkUser(),
  isValidId,
  validBody(createContactSchema),
  ctrlWrapper(upsertContactController),
);

router.patch(
  '/:contactId',
  checkUser(),
  isValidId,
  validBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

export default router;