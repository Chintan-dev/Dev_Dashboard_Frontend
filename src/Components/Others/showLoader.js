import React, { useEffect, useState } from 'react';

export default function ShowLoader(Isloader) {
    const [spinning, setSpinning] = React.useState(false);
    Isloader ? setSpinning(Isloader) : setTimeout(() => { setSpinning(false); }, 500);
}