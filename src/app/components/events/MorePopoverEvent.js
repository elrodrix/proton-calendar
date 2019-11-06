import React, { useRef } from 'react';
import { c } from 'ttag';
import PropTypes from 'prop-types';

import usePopoverPlacement from './usePopoverPlacement';
import FullDayEvent from './FullDayEvent';

const MorePopoverEvent = ({
    onClose,
    formatTime,
    style,
    layout,
    events = [],
    eventRef,
    selectedEventID,
    selectedMoreDate,
    setSelectedEventID
}) => {
    const ref = useRef();
    const otherStyle = usePopoverPlacement(ref, style, layout);

    return (
        <div style={otherStyle} className="eventpopover p1" ref={ref}>
            <header className="">
                <h1 className="">{selectedMoreDate && selectedMoreDate.getUTCDate()}</h1>
                <button type="button" className="pm-modalClose" title={c('Action').t`Close popover`} onClick={onClose}>
                    ×
                </button>
            </header>
            <div>
                {events.map((event) => {
                    const props = {
                        onClick: () => setSelectedEventID(event.id)
                    };
                    const isSelected = selectedEventID === event.id;
                    if (isSelected) {
                        props.eventRef = eventRef;
                    }
                    return (
                        <FullDayEvent
                            formatTime={formatTime}
                            event={event}
                            key={event.id}
                            className="dayeventcell"
                            isSelected={isSelected}
                            {...props}
                        />
                    );
                })}
            </div>
        </div>
    );
};

MorePopoverEvent.propTypes = {
    style: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    selectedEventID: PropTypes.string,
    setSelectedEventID: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
};

export default MorePopoverEvent;