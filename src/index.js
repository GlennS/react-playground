import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

var from = moment().year(1970).dayOfYear(1).hour(9).minute(0).second(0),
    to = from.clone().hour(17);

const TimePicker = props => {
    return (
        <div className="time-picker">
          <input type="number" max="23" min="00" className="time-picker-hours"
                 value={props.time.hours()}
                 onChange={ event => props.onChange(props.time.clone().hours(event.target.value)) }
            />
            <span className="time-picker-minutes">
              <input type="number" max="59" min="00"
                     value={props.time.minutes()}
                     onChange={ event => props.onChange(props.time.clone().minutes(event.target.value)) }
                />
            </span>
        </div>
    );
};

const TimeRange = props => {
    const enforceFromValidity = (from, to) => {
        if (from >= to) {
            return to.clone().minutes(to.minutes() - 1);
        } else {
            return from;
        }
    };

    const enforceToValidity = (from, to) => {
        if (from >= to) {
            return from.clone().minutes(from.minutes() + 1);
        } else {
            return to;
        }
    };

    return (
        <div className="time-range" >
          <TimePicker
            time={props.from}
            onChange={
                newFrom => {
                    props.onChange(
                        newFrom,
                        enforceToValidity(newFrom, props.to)
                    );
                }
            }
            />
            <TimePicker
              time={props.to}
              onChange={
                  newTo => {
                      props.onChange(
                          enforceFromValidity(props.from, newTo),
                          newTo
                      );
                  }
              }
              />
        </div>
    );
};

const update = () => ReactDOM.render(
    (
        <TimeRange from={from}
                   to={to}
                   onChange={
                       (newFrom, newTo) => {
                           from = newFrom;
                           to = newTo;
                           update();
                       }
          }

          />
    ),
    document.getElementById('root')
);

update();
