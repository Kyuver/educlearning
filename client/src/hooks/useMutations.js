import { useMutation, useQueryClient } from "@tanstack/react-query";
import { create, update, softDelete, restore, sendNotification, acceptInvitation, declineInvitation } from "../lib/api";
import toast from "react-hot-toast";

function notifySuccess(result) {
  if (result?.status === "success") {
    toast.success(result.msg || "Success");
  }
}

function notifyError(err) {
  toast.error(err?.msg || "Something went wrong");
}

function useCrudMutation(mutationFn, onSuccess) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: (result) => {
      notifySuccess(result);
      qc.invalidateQueries();
      onSuccess?.();
    },
    onError: notifyError,
  });
}

export function useCreateData(onSuccess) {
  return useCrudMutation(({ table, data }) => create(table, data), onSuccess);
}

export function useUpdateData(onSuccess) {
  return useCrudMutation(({ table, id, data }) => update(table, id, data), onSuccess);
}

export function useDeleteData(onSuccess) {
  return useCrudMutation(({ table, id }) => softDelete(table, id), onSuccess);
}

export function useRestoreData(onSuccess) {
  return useCrudMutation(({ table, id }) => restore(table, id), onSuccess);
}

export function useRespondInvitation(onSuccess) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, action }) =>
      action === "accept" ? acceptInvitation(id) : declineInvitation(id),
    onSuccess: (result) => {
      notifySuccess(result);
      qc.invalidateQueries();
      onSuccess?.();
    },
    onError: notifyError,
  });
}

export function useSendInvitation(onSuccess) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ data }) => {
      const invitation = await create("invitation", {
        courseName: data.courseName,
        status: "PENDING",
        sentById: data.sentById,
        receivedById: data.receivedById,
        topicId: data.topicId,
      });
      await sendNotification({
        type: "INVITATION",
        title: "Course invitation",
        message: `You've been invited to teach "${data.courseName}".`,
        status: "UNREAD",
        senderId: data.sentById,
        receiverId: data.receivedById,
      });
      return invitation;
    },
    onSuccess: (result) => {
      notifySuccess(result);
      qc.invalidateQueries();
      onSuccess?.();
    },
    onError: notifyError,
  });
}
