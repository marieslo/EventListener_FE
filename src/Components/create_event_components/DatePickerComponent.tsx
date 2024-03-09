import { Button } from '@chakra-ui/button';
import { Box, background } from '@chakra-ui/react';
import { setHours, setMinutes } from 'date-fns';
import { useState } from 'react';
import DatePicker from "react-datepicker";


export default function CustomDatePicker({ date, setDate }: { date: any, setDate: any }) {

    return (
        <Box>
            <DatePicker
                showIcon
                selected={date}
                onChange={(date: Date) => setDate(date)}
                timeFormat="HH:mm"
                dateFormat="MMMM d, yyyy h:mm aa"
                locale="pt-BR"
                showTimeSelect
                timeIntervals={15}
            />
        </Box>
    );
};