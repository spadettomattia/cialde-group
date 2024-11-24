const SERVER_URL = "https://api.jsonbin.io/v3/b/673f5471e41b4d34e4581712";
const API_KEY = "$2a$10$SGgHtOzZ/54yQFKu6uQb7.uwtULrz2/rhb2hdcUkzP4JWPbQfAS/i";

export const fetchData = async () => {
  const response = await fetch(SERVER_URL, {
    headers: {
      "X-Master-Key": API_KEY,
    },
  });
  const { record } = await response.json();

  return record.users;
};

export const updateData = async (arr: any) => {
  try {
    const response = await fetch(SERVER_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": API_KEY,
      },
      body: JSON.stringify({ users: arr }),
    });

    console.log("response", response);

    if (response.ok) {
      return "success";
    }
  } catch (error) {
    console.log("Error during save data");
  }
};
