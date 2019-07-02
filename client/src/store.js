import Vue from 'vue';
import Vuex from 'vuex';
import feathersVuex from 'feathers-vuex';
import feathersClient from './feathers-client';

const {
  service,  
  auth, 
  FeathersVuex, 
} = feathersVuex(feathersClient, { idField: '_id' });

Vue.use(Vuex);
Vue.use(FeathersVuex);

export default new Vuex.Store({
  plugins: [
    service('users', {
        instanceDefaults: {
          email: '',
          password: '',
          displayName: '',
          imageUrl: '',
        },
      }
    ),
    service('boards', {
        instanceDefaults: {
          name: '',
          background: '',
          ownerId: '',
          memberIds: [],
        },
      }
    ),
    service('lists', {
        instanceDefaults: {
          name: '',
          order: 0,
          archived: false,
          boardId: '',
        },
      }
    ),
    service('cards', {
        instanceDefaults: {
          title: '',
          description: '',
          order: 0,
          archived: false,
          listId: '',
          memberIds: [],
        },
      }
    ),
    auth({ userService: 'users',
          payload: undefined,
          isAuthenticatePending: false,
    }),
  ],
});
