import React from "react";

const MainVideoSummary = ({ unitIndex, chapter, chapterIndex }) => {
    console.log(chapter)
    return (
        <div className="mt-12 flex-[2] px-12">
            <h4 className="text-md uppercase text-secondary-foreground/60">
                Unit {unitIndex + 1} &bull; Chapter {chapterIndex + 1}
            </h4>
            <h1 className="text-4xl font-bold">{chapter?.chapter_name}</h1>
            <iframe
                title="chapter video"
                className="my-4 mt-4 aspect-video h-[700px] w-full"
                src={`https://www.youtube.com/embed/${chapter?.video_id}`}
                allowFullScreen
            />
            <div className="mt-8">
                <h3 className="text-3xl font-semibold">Transcript Summary</h3>
                <p className="mt-2 text-secondary-foreground/80 text-lg">
                    {chapter?.video_transcript}
                </p>
            </div>
        </div>
    );
};

export default MainVideoSummary;