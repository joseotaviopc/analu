import sanityClient from '@sanity/client'

const client = sanityClient({
  projectId: 's3r3d0cg',
  dataset: 'production',
  apiVersion: '2021-10-21',
  token: 'skDX9rIE1L2xbSullvh2WlXWpoBSeSNiG1SWsgx8JukLgOfXhwFQDmvjbn8H1vEFBDPnlI3LTFWzUVec6hEbrTlO4MAIvkzvsYYsO3raSmRDqIA0u3teKy8gGTqlyvfMj1mMn49rjuWeKENaWv6fU753DgX88Q2ZUEFi4LLIwWXKtkCA3WsI'
})

export default client
