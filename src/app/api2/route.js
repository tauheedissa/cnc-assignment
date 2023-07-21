import React from "react";

import { NextResponse } from "next/server";

const data = [{"name":"ali","city":"Absar"},{"name":"nawaz","city":"Turbat"}];

// export async function GET() {
//     return NextResponse.json(dat a)

// }

export async function GET(req) {
    const url = req.nextUrl.searchParams.get('name');
    const newData = data.filter((d) => {
        return (
            d.name == url && d
        )
    })
    return NextResponse.json(newData);

}


export async function POST(req) {
    //data coming from PostMan body JSON
    const response = await req.json()
    // Push coming data to data object/array
    data.push(response)
    return NextResponse.json(data)
   
  }


  export async function PUT(req) {
    //url as parameter
    const url = req.nextUrl.searchParams.get('name');
    const request = await req.json()
    const newData = data.filter((d) => {
        return (
            d.name !== url && d
        )
    })
    console.log(newData)
    // const newResponse = [newData, request]
    return NextResponse.json(request);

}


  export async function PATCH(req) {
    const response = await req.json()
    //into object
    // return NextResponse.json(response)
    //convert to array
    return NextResponse.json([response])
    
  }

  
  export async function DELETE() {
    return NextResponse.json()
    
    
  }


