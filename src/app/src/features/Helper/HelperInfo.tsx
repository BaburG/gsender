/*
 * Copyright (C) 2022 Sienci Labs Inc.
 *
 * This file is part of gSender.
 *
 * gSender is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, under version 3 of the License.
 *
 * gSender is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with gSender.  If not, see <https://www.gnu.org/licenses/>.
 *
 * Contact for information regarding this program and its license
 * can be sent through gSender@sienci.com or mailed to the main office
 * of Sienci Labs Inc. in Waterloo, Ontario, Canada.
 *
 */

import styles from './index.module.styl';
import cx from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { FaInfoCircle, FaTimes } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const HelperInfo = ({ payload, infoVisible, onClose }) => {
    const { title, description } = payload;
    const [visible, setVisible] = useState(infoVisible);

    useEffect(() => {
        setVisible(infoVisible);
    }, [infoVisible]);

    return (
        <div
            className={cx(
                'absolute top-1/3 left-4 w-1/2 -translate-y-2/3 bg-amber-100 rounded flex flex-col content-end overflow-hidden z-[10000] border-2 border-orange-600',
                {
                    hidden: !visible,
                },
            )}
        >
            <div className="border-b border-b-orange-600 p-2 flex flex-row justify-between items-center">
                <h1 className="flex flex-row gap-2 items-center justify-center p-0 mr-4 text-orange-600 font-bold text-xl">
                    <FaInfoCircle className="text-2xl" /> {title}
                </h1>
                <div className="flex cursor-pointer bg-orange-100">
                    <FaTimes onClick={() => onClose()} />
                </div>
            </div>
            <CSSTransition
                key="wizContent"
                timeout={350}
                classNames={{
                    enterActive: styles.maximizeActive,
                    enterDone: styles.maximizeDone,
                    exitActive: styles.minimizeActive,
                    exitDone: styles.minimizeDone,
                }}
            >
                <div
                    id="wizContent"
                    className="flex p-4 justify-stretch items-stretch flex-grow"
                >
                    <span>{description}</span>
                </div>
            </CSSTransition>
        </div>
    );
};

export default HelperInfo;
