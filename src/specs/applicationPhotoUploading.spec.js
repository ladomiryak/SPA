import 'babel-polyfill';

import faker from 'faker';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import ObjectID from 'bson-objectid';
import { put, select } from 'redux-saga/effects';

import * as actions from './../actions/applicationPhotoUploading';
import { API_URL } from './../constants/api';
import { getApplicationMedia } from './../reducers/applicationPhotoUploading';
import store from './../store';
import * as constants from './../constants/applicationPhotoUploading';

require('jasmine-co').install();

const mockRequest = new MockAdapter(axios);

const {
    dispatch,
    getState,
} = store;

const expect = chai.expect;

describe('application media', function() {
    it('will start uploading', function * () {
        const fakeImg = faker.image.imageUrl();

        mockRequest.onPost(`${API_URL}/media`).reply(201, {
            url: fakeImg,
        });

        const aBlob = new Blob(['some', 'blob'], { type : 'image/jpeg' });
        const imageId = ObjectID().toString();

        dispatch(actions.startUploading({
            id: imageId,
            async: false,
            file: aBlob,
            controller: 'test',
        }));
    
        const state = getApplicationMedia(getState());

        expect(state).to.be.an('Object')
            .and.have.property('files')
            .and.have.lengthOf(1);
        expect(state.files[0]).to.be.an('Object')
            .and.have.property('id', imageId);
    });
});
