import { Redirect, Stack } from "expo-router";


const SettingsLayout = () => {

  return (
    <>
      <Stack>
      <Stack.Screen
          name="subscribe"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="profile"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
};

export default SettingsLayout;