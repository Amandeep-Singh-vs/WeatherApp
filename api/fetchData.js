export async function fetchData(url) {
    try{
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    catch(err)
    {
        alert("Error occurred while fetching weather data:", error);
    }
}