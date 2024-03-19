export async function fetchData(url) {
  const currentUser = localStorage.getItem("authToken");
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: "Bearer " + JSON.parse(currentUser).token,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function deleteData(url) {
  const currentUser = localStorage.getItem("authToken");
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + JSON.parse(currentUser).token,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function updateData(url, data) {
  const currentUser = localStorage.getItem("authToken");
  try {
    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        Authorization: "Bearer " + JSON.parse(currentUser).token,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function createData(url, data) {
  const currentUser = localStorage.getItem("authToken");
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: "Bearer " + JSON.parse(currentUser).token,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
