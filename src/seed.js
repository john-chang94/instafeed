/* eslint-disable no-plusplus */
// NOTE: replace 'NvPY9M9MzFTARQ6M816YAzDJxZ72' with your Firebase auth user id (can be taken from Firebase)
export function seedDatabase(firebase) {
  const users = [
    {
      userId: 'lZMMWun2IDZiuJNbjA7rLgMnhWt1',
      username: 'karl',
      firstName: 'Karl',
      lastName: 'Hadwen',
      emailAddress: 'karlhadwen@gmail.com',
      following: ['2'],
      followers: ['2', '3', '4'],
      dateCreated: Date.now()
    },
    {
      userId: '2',
      username: 'raphael',
      firstName: 'Raffaello',
      lastName: 'Urbino',
      emailAddress: 'raphael@sanzio.com',
      following: [],
      followers: ['lZMMWun2IDZiuJNbjA7rLgMnhWt1'],
      dateCreated: Date.now()
    },
    {
      userId: '3',
      username: 'dali',
      firstName: 'Salvador',
      lastName: 'Dalí',
      emailAddress: 'salvador@dali.com',
      following: [],
      followers: ['lZMMWun2IDZiuJNbjA7rLgMnhWt1'],
      dateCreated: Date.now()
    },
    {
      userId: '4',
      username: 'orwell',
      firstName: 'George',
      lastName: 'Orwell',
      emailAddress: 'george@orwell.com',
      following: [],
      followers: ['lZMMWun2IDZiuJNbjA7rLgMnhWt1'],
      dateCreated: Date.now()
    }
  ];

  // eslint-disable-next-line prefer-const
  for (let k = 0; k < users.length; k++) {
    firebase.firestore().collection('users').add(users[k]);
  }

  // eslint-disable-next-line prefer-const
  for (let i = 1; i <= 5; ++i) {
    firebase
      .firestore()
      .collection('photos')
      .add({
        imageId: i,
        userId: '2',
        imageSrc: `/images/users/raphael/${i}.jpg`,
        caption: 'Saint George and the Dragon',
        likes: [],
        comments: [
          {
            displayName: 'dali',
            comment: 'Love this place, looks like my animal farm!'
          },
          {
            displayName: 'orwell',
            comment: 'Would you mind if I used this picture?'
          }
        ],
        userLatitude: '40.7128°',
        userLongitude: '74.0060°',
        dateCreated: Date.now()
      });
  }
}
