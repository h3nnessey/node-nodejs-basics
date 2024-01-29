const PREFIX = '--';
const SEPARATOR = ', ';

const parseArgs = () => {
  const args = process.argv.slice(2);
  const parsedArgs = args
    .reduce(
      (acc, curr, i) =>
        curr.startsWith(SEPARATOR) && args[i + 1]
          ? [...acc, `${curr.slice(2)} is ${args[i + 1]}`]
          : acc,
      [],
    )
    .join(SEPARATOR);

  console.log(parsedArgs);
};

parseArgs();
