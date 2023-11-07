'use client';

import { getUser, type User } from '@/app/actions';
import React, { useEffect } from 'react';

import { assign, createMachine } from 'xstate';
import { useMachine } from '@xstate/react';

const userMachine = createMachine(
  {
    id: 'nameOf',
    tsTypes: {} as import('./user.typegen').Typegen0,
    schema: {
      context: {} as { user?: User; userId?: number },
      events: {} as { type: 'load.user'; userId: number },
      services: {} as {
        getUser: {
          data: User;
        };
      },
    },
    context: {},
    initial: 'idle',
    states: {
      idle: {
        on: {
          'load.user': {
            actions: [
              assign({
                userId: (_context, event) => event.userId,
              }),
            ],
            target: 'loadingUser',
          },
        },
      },
      loadingUser: {
        invoke: {
          src: 'getUser',
          onDone: {
            actions: [
              assign({
                user: (_context, event) => event.data,
              }),
            ],
            target: 'idle',
          },
        },
      },
    },
  },
  {
    services: {
      getUser: (context) => {
        if (!context.userId) throw new Error('no user id');
        return getUser(context.userId);
      },
    },
  }
);

function UserCard() {
  const [userState, sendUser] = useMachine(userMachine);
  const [count, setCount] = React.useState(0);

  useEffect(() => {
    sendUser('load.user', { userId: 1 });
  }, [sendUser]);

  const { name, id, email } = userState.context.user ?? { title: 'no user', id: 0 };

  return (
    <div>
      {count}
      <div className="p-6 bg-slate-300 rounded-md shadow-md mb-2">
        {userState.matches('loadingUser') ? (
          <h1 className="text-lg">Loading...</h1>
        ) : (
          <>
            <h1>
              {name} id: {id}
            </h1>
            <p>{email}</p>
          </>
        )}
      </div>
      <div className="flex gap-4">
        <button className="bg-white p-2 border-m rounded-sm" onClick={() => setCount((count) => (count += 1))}>
          inc count
        </button>
        <button className="bg-white p-2 border-m rounded-sm" onClick={() => setCount((count) => (count -= 1))}>
          dec count
        </button>
      </div>
      <button
        className="bg-white p-2 border-m rounded-sm"
        onClick={() =>
          sendUser({
            type: 'load.user',
            userId: userState.context.userId! + 1,
          })
        }
      >
        Get Next user!!
      </button>
    </div>
  );
}

export default UserCard;
