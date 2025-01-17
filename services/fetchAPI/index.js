const postAPI = async (
    URL,
    body,
    method = "POST",
    headers = { "Content-Type": "application/json" }
  ) => {
    try {
      if (!process.env.NEXT_PUBLIC_API_URL || !URL) {
        throw new Error("URL bulunamadı!");
      }
      const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL + URL}`, {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
        cache: "no-store",
      })
      if(!data.ok) throw  new Error('Failed')
      return await data.json()
    } catch (err) {
      throw new Error(`API request failed: ${err}`);
    }
  };
  
  const getAPI = async (
    URL,
    headers = { "Content-Type": "application/json" }
  ) => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL + URL}`, {
      method: "GET",
      headers: headers,
      cache: "no-store",
    })
    if(!data.ok) throw  new Error('Failed')
    return await data.json()
  };

  const deleteAPI = async (
    URL,
    headers = { "Content-Type": "application/json" }
  ) => {
    try {
      if (!process.env.NEXT_PUBLIC_API_URL || !URL) {
        throw new Error("URL bulunamadı!");
      }
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL + URL}`, {
        method: "DELETE",
        headers: headers,
        cache: "no-store",
      });
      if (!response.ok) throw new Error("Failed");
      return await response.json();
    } catch (err) {
      throw new Error(`API DELETE request failed: ${err}`);
    }
  };
  
  const putAPI = async (
    URL,
    body,
    headers = { "Content-Type": "application/json" }
  ) => {
    try {
      if (!process.env.NEXT_PUBLIC_API_URL || !URL) {
        throw new Error("URL bulunamadı!");
      }
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL + URL}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(body),
        cache: "no-store",
      });
      if (!response.ok) throw new Error("Failed");
      return await response.json();
    } catch (err) {
      throw new Error(`API PUT request failed: ${err}`);
    }
  };
  
  export { postAPI, getAPI, deleteAPI, putAPI };
  