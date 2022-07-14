import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Flex, Box, Heading, FormControl, FormLabel, Input, Button, Alert } from '@chakra-ui/react';
import validationSchema from './validations';
import { fetchRegister } from '../../../api';
import { useAuth } from '../../../contexts/AuthContext';

function Signup() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        const registerResponse = await fetchRegister({ email: values.email, password: values.password });
        login(registerResponse);
        navigate('/profile');
      } catch (error) {
        bag.setErrors({ general: error.response.data.message });
      }
    },
  });

  return (
    <div>
      <Flex align="center" width="full" justifyContent="center">
        <Box pt={10}>
          <Box textAlign="center">
            <Heading>Sing Up</Heading>
          </Box>
          <Box my={5} textAlign="center">
            <form onSubmit={formik.handleSubmit}>
              <FormControl>
                <FormLabel>E-mail</FormLabel>
                <Input name="email" type="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} isInvalid={formik.touched.email && formik.errors.email} />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  isInvalid={formik.touched.password && formik.errors.password}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Password Confirm</FormLabel>
                <Input
                  name="passwordConfirm"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.passwordConfirm}
                  isInvalid={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
                />
              </FormControl>
              <Button mt={4} width="full" type="submit">
                Sing Up
              </Button>
            </form>
          </Box>
          <Box my={5}>{formik.errors.general && <Alert status="error">{formik.errors.general}</Alert>}</Box>
        </Box>
      </Flex>
    </div>
  );
}

export default Signup;
