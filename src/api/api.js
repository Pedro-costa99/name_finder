const key = 'pe839753942';

const fetchData = async (number, usage, gender) => {
  try {
    const response = await fetch(`https://www.behindthename.com/api/random.json?number=${number}&usage=${usage}&gender=${gender}&key=${key}`);
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default fetchData;
