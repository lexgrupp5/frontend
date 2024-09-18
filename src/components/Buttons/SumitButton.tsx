import { Button } from 'react-aria-components';

interface Props {
  label: string;
}

export const SubmitButton: React.FC<Props> = ({
  label
}) => {
  return (
    <Button
      type="submit"
      className="w-full bg-indigo-500 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 ease-in-out">
      {label}
    </Button>
  );
};
