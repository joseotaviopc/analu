import sanityClient from '@sanity/client'

const client = sanityClient({
  projectId: 's3r3d0cg',
  dataset: 'production',
  apiVersion: '2021-10-21',
  token: import.meta.env.SANITY_TOKEN
})

export default client
