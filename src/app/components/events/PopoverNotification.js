import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { fromLocalDate, toUTCDate } from 'proton-shared/lib/date/timezone';

import {
    notificationAtToString,
    notificationUnitToString,
    notificationWhenToString
} from '../../helpers/notifications';

const PopoverNotification = ({ notification, formatTime }) => {
    const str = useMemo(() => {
        const { value, unit, when, at, isAllDay } = notification;
        const modifiedAt = toUTCDate(fromLocalDate(at));
        return [
            notificationUnitToString(value, unit),
            notificationWhenToString(when),
            isAllDay && notificationAtToString(formatTime(modifiedAt))
        ]
            .filter(Boolean)
            .join(' ');
    }, [notification, formatTime]);

    return <div>{str}</div>;
};

PopoverNotification.propTypes = {
    notification: PropTypes.object,
    formatTime: PropTypes.func
};

export default PopoverNotification;
