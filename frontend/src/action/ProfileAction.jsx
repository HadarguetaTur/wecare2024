import { updateDetails } from "../store/action/userAction";


export async function action ({ request }) {
    console.log('here');
  const formData = await request.formData();
  const data = new FormData();

  for (const [key, value] of formData.entries()) {
    data.append(key, value);
  }

  try {
    const response = await updateDetails(data); // Call your API directly here
    if (response.status === 200) {
      const result = await response.json();
      return { success: "Profile updated successfully" ,result};
    } else {
      throw new Error("Failed to update profile");
    }
  } catch (error) {
    return { error: error.message };
  }
}