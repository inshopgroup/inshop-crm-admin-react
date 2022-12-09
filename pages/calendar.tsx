import * as React from 'react';
import MainLayout from '../src/components/MainLayout'

export function CalendarContent() {
    return(
        <h1>Calendar</h1>
    )
}

export default function Calendar() {
    return(
        <MainLayout>
            <CalendarContent></CalendarContent>
        </MainLayout>
    )
}