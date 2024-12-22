export interface Movie {
  title: string;
  year: string;
  imageUrl: string;
  id?: string;
}

export interface ButtonProps {
  type: string;
  label: string;
  onClick?: () => void;
}
