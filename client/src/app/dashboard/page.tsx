"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import CreateCardModal from "./CreateCardModal";
import { Sidebar } from "@/components/Layouts/sidebar";
import { Header } from "@/components/Layouts/header";
import CreateUserModal from "./CreateUserModal";
import CardPage from "./pageForCard";

interface task {
  card_id: number;
  user_id: number;
  card_title: string;
}

export default function KanbanBoard() {
  const [isUserCreationOpen, setIsUserCreationOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskList, setTaskList] = useState<task[]>([]);
  const [cardData, setCardData] = useState<[number,number]>([0,0]); 
  // CardId, UserId

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openUserCreation = () => setIsUserCreationOpen(true);
  const closeUserCreation = () => setIsUserCreationOpen(false);

  const stableSetTaskList = useCallback((newTaskList: task[] | ((prev: task[]) => task[])) => {
    setTaskList(newTaskList);
  }, [setTaskList]);
    
  useEffect(() => {
    const userId = localStorage.getItem("userConnectedId");
    fetch(`http://localhost:8080/cards/user/${userId}`)
      .then((rawData) => rawData.json())
      .then((data) => {
        setTaskList(data?.message ? [] : data);
      })
      .catch((error) => {
        console.error("Error fetching tasks: ", error);
      });
  }, []);  // Ce useEffect ne s'exécute qu'une seule fois au montage
  

  
  // Préparation des données de navigation (memoization)
  const navData = useMemo(() => [
    {
      label: "Fonctionnalités",
      items: [
        {
          title: "Créer un utilisateur",
          activateAction: openUserCreation,
          items: [],
        },
        {
          title: "Créer une tâche",
          activateAction: openModal,
          items: [],
        },
      ],
    },
    {
      label: "Tâches",
      items: taskList.map((task) => ({
        id: task.card_id,
        title: task.card_title,
        activateAction: () => {
          setCardData([task.card_id,task.user_id])
        },
        items: [],
      })),
    },
  ], [taskList]);  // Si taskList change, on met à jour navData

  return (
    <div className="flex min-h-screen">
      <Sidebar navData={navData} />
      <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
        <Header />
        {isUserCreationOpen && (
          <CreateUserModal closeUserCreating={closeUserCreation} />
        )}
        {isModalOpen && (
          <CreateCardModal setTaskList={stableSetTaskList} closeModal={closeModal} />
        )}
        <div className="isolate mx-auto w-full overflow-hidden p-4 md:p-6 2xl:p-10">
          { cardData[0] ? (
            <CardPage cardData={cardData} />
          ) : (
            <p>Aucune carte n&apos;est sélectionnée...</p>
          )}
        </div>
      </div>
    </div>
  );
}
