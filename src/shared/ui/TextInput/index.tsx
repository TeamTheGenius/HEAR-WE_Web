import {
  createContext,
  PropsWithChildren,
  useContext,
  useId,
  Children,
  ReactNode,
  isValidElement,
  InputHTMLAttributes,
  forwardRef,
  ForwardedRef,
  ButtonHTMLAttributes,
} from 'react';
import styles from './index.module.scss';
import Button, { type ButtonType } from '../Button';
import { cn } from '../../lib/cn';

interface TextInputContextType {
  inputId: string;
}

interface LabelProps extends PropsWithChildren {
  isVisible?: boolean;
  isRequired?: boolean;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  hasError: boolean;
}

interface ButtonProps extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  variant?: ButtonType;
  text: string;
  onClick?: () => void;
}

interface MessageProps extends PropsWithChildren {
  variant: 'success' | 'information' | 'warning';
}

const ForwardedInput = forwardRef(Input);
const ButtonComponent = (<Action text="" onClick={() => {}} />).type;
const MessageComponent = (<Message variant="warning" />).type;
const InputComponent = (<ForwardedInput placeholder="" hasError={false} />).type;
const LabelComponent = (<Label />).type;

const TextInputContext = createContext<TextInputContextType | null>(null);

function getElements(children: ReactNode, component: JSX.Element['type']) {
  const childrenArray = Children.toArray(children);
  return childrenArray.filter((child) => isValidElement(child) && child.type === component).slice(0, 2);
}

function Main({ children }: PropsWithChildren) {
  const inputId = useId();

  const labelElement = getElements(children, LabelComponent);
  const inputElement = getElements(children, InputComponent);
  const buttonElement = getElements(children, ButtonComponent);
  const messageElement = getElements(children, MessageComponent);

  return (
    <TextInputContext.Provider value={{ inputId }}>
      <div className={styles.wrapper}>
        {labelElement}
        <div className={styles.container}>
          {inputElement}
          {buttonElement}
        </div>
        {messageElement}
      </div>
    </TextInputContext.Provider>
  );
}

function Label({ isVisible = true, isRequired = false, children }: LabelProps) {
  const context = useContext(TextInputContext);
  if (!context) return null;
  const { inputId } = context;

  return (
    <label htmlFor={inputId} className={cn(isVisible ? styles.labelContainer : styles.blind)}>
      <span className={styles.label}>{children}</span>
      {isRequired && <span className={styles.requiredInputLabel}>{' * '}</span>}
    </label>
  );
}

function Input({ placeholder, hasError, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>) {
  const context = useContext(TextInputContext);
  if (!context) return null;
  const { inputId } = context;

  return (
    <input
      type="text"
      id={inputId}
      placeholder={placeholder}
      className={cn(hasError && styles.inputError, styles.input)}
      ref={ref}
      {...props}
    />
  );
}

function Message({ children, variant }: MessageProps) {
  return <span className={cn(styles[`${variant}-message`], styles.message)}>{children}</span>;
}

function Action({ text, variant = 'secondary', onClick, ...props }: ButtonProps) {
  return <Button variant={variant} text={text} size="medium" onClick={onClick} className={styles.button} {...props} />;
}

export const TextInput = Object.assign(Main, {
  Label,
  Input: ForwardedInput,
  Message,
  Button: Action,
});
