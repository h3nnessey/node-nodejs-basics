const PREFIX = 'RSS_';
const SEPARATOR = '; ';

const parseEnv = () => {
  const parsedEnv = Object.entries(process.env)
    .reduce((acc, [key, value]) => (key.startsWith(PREFIX) ? [...acc, `${key}=${value}`] : acc), [])
    .join(SEPARATOR);

  console.log(parsedEnv);
};

parseEnv();
