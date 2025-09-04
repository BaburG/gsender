import { StatusIndicator } from 'app/features/SDCard/components/StatusIndicator.tsx';
import { FileList } from 'app/features/SDCard/components/FileList.tsx';
import { useSDCard } from 'app/features/SDCard/hooks/useSDCard.ts';

const SDCardElement = () => {
    const { isMounted, setUploadProgress, setUploadState } = useSDCard();

    return (
        <div className="bg-gray-50 h-full flex">
            <div className="w-4/5 mx-auto py-6">
                <div className="space-y-8 flex flex-col h-full">
                    <StatusIndicator isMounted={isMounted} />
                    <FileList />
                </div>
            </div>
        </div>
    );
};

const SDCard = () => {
    return <SDCardElement />;
};

export default SDCard;
