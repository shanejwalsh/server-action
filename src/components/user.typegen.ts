// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    '': { type: '' };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    getUser: 'done.invoke.userMachine.loadingUser:invocation[0]';
  };
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {};
  eventsCausingDelays: {};
  eventsCausingGuards: {
    isUserEven: '';
  };
  eventsCausingServices: {
    getUser: 'load.user';
  };
  matchesStates: 'idle' | 'idle.even' | 'idle.odd' | 'loadingUser' | { idle?: 'even' | 'odd' };
  tags: never;
}
