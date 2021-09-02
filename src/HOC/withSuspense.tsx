import React, {ComponentType, Suspense} from 'react';
import Preloader from '../common/Preloader/Preloader';

type PropsType = any

export function withSuspense<T>(Component: ComponentType<T>) {

    return (props: PropsType) => {
        return <Suspense fallback={<Preloader />}>
            <Component {...props} />
        </Suspense>
    }
}