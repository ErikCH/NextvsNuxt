'use client'

import {Amplify} from 'aws-amplify'
import awsExports from '@/aws-exports'
import {Authenticator} from '@aws-amplify/ui-react'
import React, { ReactNode } from 'react'
import { AmazonAIPredictionsProvider } from "@aws-amplify/predictions";
import '@aws-amplify/ui-react/styles.css'

Amplify.configure({...awsExports, ssr: true})
Amplify.addPluggable(new AmazonAIPredictionsProvider());

export default function Home({children}: {children?: ReactNode}) {
    return <Authenticator>{children}</Authenticator>
}
