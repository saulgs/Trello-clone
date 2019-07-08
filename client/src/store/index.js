import Vue from 'vue';
import Vuex from 'vuex';
import feathersVuex from './feathersVuex';

import brd from './brd';

const {
  service,  
  auth, 
  FeathersVuex, 
} = feathersVuex;

Vue.use(Vuex);
Vue.use(FeathersVuex);

export default new Vuex.Store({
  modules: {
    brd,
  },
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
    service('activities', {
      instanceDefaults: {
        text: '',
        boardId: '',
        userId: '',
      },
    }
  ),
    auth({ userService: 'users',
          payload: undefined,
          isAuthenticatePending: false,
    }),
  ],
});
