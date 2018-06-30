/**
 * Copyright Yafei Hu
 */

import mockRequests from './data.json'

export const getRequestsSync = () => mockRequests

export const getRequests = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(mockRequests), 500)
  })
