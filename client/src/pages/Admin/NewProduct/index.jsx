import React from 'react';
import { useMutation } from 'react-query';
import { Formik, FieldArray } from 'formik';
import { postProduct } from '../../../api';
import { Text, Box, FormControl, FormLabel, Input, Textarea, Button } from '@chakra-ui/react';
import { AlertDialog, AlertDialogBody, AlertDialogContent, useDisclosure } from '@chakra-ui/react';
import validationSchema from './validations';

function NewProduct() {
  const postProductMutation = useMutation(postProduct);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = async (values) => {
    try {
      const newPhotos = JSON.stringify(values.photos);
      await postProductMutation.mutate({ ...values, photos: newPhotos });
      onOpen();
      setTimeout(() => onClose(), 1500);
    } catch (error) {
      return <span>Error: {error.message}</span>;
    }
  };

  return (
    <div>
      <Text fontSize="2xl">Edit</Text>
      <Formik
        initialValues={{
          title: '',
          description: '',
          price: '',
          photos: [],
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, errors, touched, handleChange, handleBlur, values, isSubmitting }) => (
          <Box>
            <Box my={5} textAlign="left">
              <form onSubmit={handleSubmit}>
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input name="title" onChange={handleChange} onBlur={handleBlur} value={values.title} disabled={isSubmitting} isInvalid={touched.title && errors.title} />
                  {touched.title && errors.title && (
                    <Text pl={3} color="red">
                      {errors.title}
                    </Text>
                  )}
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    rows={5}
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    disabled={isSubmitting}
                    isInvalid={touched.description && errors.description}
                  />
                  {touched.description && errors.description && (
                    <Text pl={3} color="red">
                      {errors.description}
                    </Text>
                  )}
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Price</FormLabel>
                  <Input name="price" onChange={handleChange} onBlur={handleBlur} value={values.price} disabled={isSubmitting} isInvalid={touched.price && errors.price} />
                  {touched.price && errors.price && (
                    <Text pl={3} color="red">
                      {errors.price}
                    </Text>
                  )}
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Photos</FormLabel>
                  <FieldArray
                    name="photos"
                    render={(arrayHelpers) => (
                      <div>
                        {values.photos &&
                          values.photos.map((photo, i) => (
                            <div key={i}>
                              <Input name={`photos.${i}`} onChange={handleChange} onBlur={handleBlur} value={photo} disabled={isSubmitting} width="88%" mt={2} />
                              <Button mb={1.5} ml={2} type="button" colorScheme="red" onClick={() => arrayHelpers.remove(i)}>
                                Remove
                              </Button>
                            </div>
                          ))}
                        <Button mt={5} onClick={() => arrayHelpers.push('')}>
                          Add a Photo
                        </Button>
                      </div>
                    )}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <Button mt={4} width="full" type="submit" isLoading={isSubmitting} colorScheme="green">
                    Save
                  </Button>
                </FormControl>
              </form>
            </Box>
          </Box>
        )}
      </Formik>
      <AlertDialog size="xs" isOpen={isOpen} onClose={onClose}>
        <AlertDialogContent alignItems="center">
          <AlertDialogBody>Successfully added</AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default NewProduct;
