import { AppDispatch } from '../../index';
import { IEvent } from './../../../models/IEvent';
import { IUser } from './../../../models/IUser';
import { EventActionEnum, SetGuestsAction, SetEventsAction } from './types';
import axios from 'axios';

export const EventActionCreators = {
    setGuests: (payload: IUser[]): SetGuestsAction => ({type: EventActionEnum.SET_GUESTS, payload}),
    setEvents: (payload: IEvent[]): SetEventsAction => ({type: EventActionEnum.SET_EVENTS, payload}),
    fetchGuests: () => async (dispatch: AppDispatch) => {
        try {
            const guests = await axios.get('./users.json')
        } catch (e) {
            console.log(e);
            
        }
    }
}