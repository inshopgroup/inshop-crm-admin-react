import * as React from 'react';

interface PageHeaderProps {
    title: string
}

export default function PageHeader(props: PageHeaderProps) {
    return (
        <h1>
            {props.title}
        </h1>
    );
}
