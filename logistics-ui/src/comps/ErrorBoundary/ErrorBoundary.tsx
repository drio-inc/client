import { ReactNode, Component } from "react";

function logErrorNicely(error: unknown, errorInfo: unknown): void {
  console.log(
    "%c[ERROR]",
    "display: inline-block; background-color: #E30B5C; color: #ffffff; font-weight: bold; padding: 3px 7px 3px 7px; border-radius: 3px 3px 3px 3px;",
    error,
    errorInfo
  );
}

interface Props {
  children: ReactNode;
}

export default class ErrorBoundary extends Component<Props> {
  state: { hasError: boolean };

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: unknown) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    // You can also log the error to an error reporting service
    logErrorNicely(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You may render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
