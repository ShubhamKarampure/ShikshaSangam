const signin = async (data) => {
  yourIp = "192.168.1.5" // Give your IP for identifying where backend is running to mobile
  const BACKEND_URL = "http://"+yourIp+":8000"; 

  try {
    // Correct the URL here by removing spaces and using BACKEND_URL
    const response = await fetch(`${BACKEND_URL}/users/auth/login/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw { response: { data: errorData } };
    }

    const result = await response.json();
    console.log(result);
    
    return result;
  } catch (error) {
    throw error;
  }
};

export default signin;
