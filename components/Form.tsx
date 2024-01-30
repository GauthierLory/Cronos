import * as z from 'zod';
import { Text, View, TextInput, Button, Alert } from "react-native"
import { useForm, Controller, SubmitHandler } from "react-hook-form"

import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const schema = yup
  .object({
    firstName: yup.string().required().min(2),
    lastName: yup.string().required(),
  })
  .required()

export default function App() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
    resolver: yupResolver(schema),
  })

      const onSubmit = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log(data);
        } catch(error) {
            console.log(error);
        }
    };

  return (
    <View>
      <Controller
        control={control}
        name={"firstName"}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="First name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.firstName && <Text>{errors.firstName?.message}</Text>}
      

      <Controller
        control={control}
        name={"lastName"}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Last name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.lastName && <Text>{errors.lastName?.message}</Text>}
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  )
}