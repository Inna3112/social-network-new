import React, {ErrorInfo, ReactNode} from 'react';

type MapStatePropsType = {
    children: ReactNode;
}
type OwnPropsType = {
    hasError: boolean
}

class ErrorBoundary extends React.Component<MapStatePropsType, OwnPropsType>{
    public state: OwnPropsType = {
        hasError: false
    }

    public static getDerivedStateFromError(error: Error): OwnPropsType {
        // Оновлюємо стан, щоб наступний рендер показав запасний UI.
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Ви також можете передати помилку в службу звітування про помилки
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            // Ви можете відрендерити будь-який власний запасний UI
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary